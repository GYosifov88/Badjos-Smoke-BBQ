from enum import Enum

from cloudinary.models import CloudinaryField
from django.contrib.auth import get_user_model
from django.db import models

from BadjosSmokeBBQ.core.model_mixins import StrFromFieldsMixin, ChoicesEnumMixin
from BadjosSmokeBBQ.core.validators import validate_file_less_than_7mb

# UserModel = get_user_model()


class ArticleCategory(ChoicesEnumMixin, Enum):
    food = 'Food'
    beverages = 'Beverages'
    experiments = 'Experiments'
    events = 'Events'
    internal = 'Internal'
    the_rest = 'The Rest'


class Article(StrFromFieldsMixin, models.Model):
    str_fields = ('pk', 'photo', 'title')
    MAX_AUTHOR_NAME = 40
    MAX_LEN_TITLE = 100

    title = models.CharField(
        max_length=MAX_LEN_TITLE,
        blank=False,
        null=False
    )

    author = models.CharField(
        max_length=MAX_AUTHOR_NAME,
        blank=False,
        null=False
    )

    photo = CloudinaryField(
        null=False,
        blank=True,
        # validators=(validate_file_less_than_7mb,),
    )

    description = models.TextField()

    category = models.CharField(
        choices=ArticleCategory.choices(),
        max_length=ArticleCategory.max_len(),
    )

    publication_date = models.DateField(
        auto_now=True,
        blank=True,
        null=False,
    )

    # user = models.ForeignKey(
    #     UserModel,
    #     on_delete=models.RESTRICT,
    # )


class ArticleComment(models.Model):
    MAX_TEXT_LENGTH = 300
    MAX_NAME_LENGTH = 60
    text = models.CharField(
        max_length=MAX_TEXT_LENGTH,
        null=False,
        blank=False,)

    publication_date_and_time = models.DateTimeField(
        auto_now_add=True,
        blank=True,
        null=False,
    )

    commentor_name = models.CharField(
        max_length=MAX_NAME_LENGTH,
        null=False,
        blank=False,
    )

    commentor_email = models.EmailField(
        null=False,
        blank=False,
    )

    article = models.ForeignKey(
        Article,
        on_delete=models.RESTRICT,
        null=False,
        blank=True,
    )

    # user = models.ForeignKey(
    #     UserModel,
    #     on_delete=models.RESTRICT,
    # )
