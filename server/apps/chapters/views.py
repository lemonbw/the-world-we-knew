from django.middleware.csrf import get_token
from rest_framework.permissions import AllowAny, IsAdminUser
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


class ChapterViewSet(ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer

    def get_permissions(self):
        if self.request.method in ["GET", "HEAD", "OPTIONS"]:
            return [AllowAny()]
        return [IsAdminUser()]
