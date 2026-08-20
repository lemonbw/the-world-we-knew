from rest_framework import serializers
from .models import Chapter


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = [
            "id",
            "volume",
            "chapter",
            "title",
            "slug",
            "content",
            "symbols",
            "created_at",
            "updated_at",
        ]
