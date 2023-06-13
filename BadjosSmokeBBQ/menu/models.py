from enum import Enum

from django.contrib.auth import get_user_model
from django.db import models
from django.template.defaultfilters import slugify

from BadjosSmokeBBQ.core.model_mixins import ChoicesEnumMixin
from BadjosSmokeBBQ.core.validators import validate_file_less_than_7mb


UserModel = get_user_model()


class FoodCategory(ChoicesEnumMixin, Enum):
    starter = 'Starter'
    bbq_dish = 'BBQ Dish'
    side = 'Side'
    dessert = 'Dessert'
    beverage = 'Beverage'


class Menu(models.Model):
    str_fields = ('id', 'name')
    MAX_TITLE = 100

    title = models.CharField(
        max_length=MAX_TITLE,
        null=False,
        blank=False,
    )

    category = models.CharField(
        choices=FoodCategory.choices(),
        max_length=FoodCategory.max_len(),
    )

    # price = models.FloatField(
    #     null=False,
    #     blank=False,
    # )

    description = models.TextField()

    photo = models.ImageField(
        upload_to='food_photos/',
        null=False,
        blank=True,
        validators=(validate_file_less_than_7mb,),
    )

    slug = models.SlugField(
        unique=True,
        null=False,
        blank=True,
    )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.slug:
            self.slug = slugify(f'{self.id}-{self.category}-{self.title}')
        return super().save(*args, **kwargs)

