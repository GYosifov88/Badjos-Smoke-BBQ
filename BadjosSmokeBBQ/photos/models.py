from enum import Enum

from cloudinary.models import CloudinaryField
from django.contrib.auth import get_user_model
from django.db import models

from BadjosSmokeBBQ.core.model_mixins import ChoicesEnumMixin, StrFromFieldsMixin
from BadjosSmokeBBQ.core.validators import validate_file_less_than_7mb

# UserModel = get_user_model()


class PhotoCategory(ChoicesEnumMixin, Enum):
    street_life = 'Street Life'
    kitchen_life = 'Kitchen Life'
    events = 'Events'
    foods = 'Foods'


class Photo(StrFromFieldsMixin, models.Model):
    str_fields = ('pk', 'photo', 'title')
    MAX_TITLE_LENGTH = 120

    photo = CloudinaryField(
        null=False,
        blank=True,
        # validators=(validate_file_less_than_7mb,),
    )

    title = models.CharField(
        max_length=MAX_TITLE_LENGTH,
        null=False,
        blank=False
    )

    category = models.CharField(
        choices=PhotoCategory.choices(),
        max_length=PhotoCategory.max_len(),
    )

    # user = models.ForeignKey(
    #     UserModel,
    #     on_delete=models.RESTRICT,
    # )


