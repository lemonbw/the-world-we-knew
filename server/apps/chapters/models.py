from django.db import models


class Chapter(models.Model):
    volume = models.PositiveIntegerField()
    chapter = models.DecimalField(
        max_digits=5,
        decimal_places=1,
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    content = models.TextField()
    symbols = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
