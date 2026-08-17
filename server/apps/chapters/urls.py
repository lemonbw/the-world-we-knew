from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import ChapterViewSet, CSRFTokenView

router = DefaultRouter()

router.register("chapters", ChapterViewSet, basename="chapter")

urlpatterns = [
    path("auth/csrf/", CSRFTokenView.as_view()),
]

urlpatterns += router.urls
