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

