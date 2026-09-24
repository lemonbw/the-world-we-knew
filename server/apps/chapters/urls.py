from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.views import APIView
from rest_framework.response import Response
from .views import ChapterViewSet, CSRFTokenView, SuperuserStatusView

router = DefaultRouter()

router.register("chapters", ChapterViewSet, basename="chapter")

urlpatterns = [
    path("auth/csrf/", CSRFTokenView.as_view()),
    path("auth/superuser/", SuperuserStatusView.as_view()),
]

urlpatterns += router.urls

