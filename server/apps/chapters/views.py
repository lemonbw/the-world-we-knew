from django.middleware.csrf import get_token
from rest_framework.permissions import AllowAny, BasePermission
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Chapter
from .serializers import ChapterSerializer


class CSRFTokenView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        return Response({"csrftoken": get_token(request)})

class SuperuserStatusView(APIView):
    def get(self, request):
        return Response({
            "isSuperuser": request.user.is_authenticated and request.user.is_superuser
        })

class IsSuperuser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_superuser)

class ChapterViewSet(ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

    def get_permissions(self):
        if self.request.method in ["GET", "HEAD", "OPTIONS"]:
            return [AllowAny()]
        return [IsSuperuser()]
