provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_namespace" "example" {
  metadata {
    name = "login-app"
  }
}

resource "kubernetes_deployment" "login_app" {
  metadata {
    name      = "login-app"
    namespace = kubernetes_namespace.example.metadata[0].name
  }
  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "login-app"
      }
    }
    template {
      metadata {
        labels = {
          app = "login-app"
        }
      }
      spec {
        container {
          image = "login-app:latest"
          name  = "login-app"
          port {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "login_app_service" {
  metadata {
    name      = "login-app-service"
    namespace = kubernetes_namespace.example.metadata[0].name
  }
  spec {
    selector = {
      app = kubernetes_deployment.login_app.spec[0].template[0].metadata[0].labels["app"]
    }
    port {
      port        = 80
      target_port = 3000
    }
    type = "LoadBalancer"
  }
}
