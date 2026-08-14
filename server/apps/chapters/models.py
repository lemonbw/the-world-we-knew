from django.db import models


class Chapter(models.Model):
    volume = models.PositiveIntegerField()
    chapter = models.PositiveIntegerField()
    index = models.PositiveIntegerField()
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    content = models.TextField()
    symbols = models.PositiveIntegerField()
    date = models.DateField()

    def __str__(self):
        return self.title
