from django.core.validators import MinLengthValidator
from django.db import models
from django.template.defaultfilters import slugify
from BadjosSmokeBBQ.core.model_mixins import StrFromFieldsMixin
from BadjosSmokeBBQ.core.validators import validate_file_less_than_7mb


class Event(StrFromFieldsMixin, models.Model):
    str_fields = ('pk', 'photo', 'venue')
    MAX_VENUE_NAME_LENGTH = 100
    MIN_VENUE_NAME_LENGTH = 5
    MAX_LOCATION_LENGTH = 50
    MIN_LOCATION_LENGTH = 5
    MAX_ADDRESS_LENGTH = 50

    venue = models.CharField(
        max_length=MAX_VENUE_NAME_LENGTH,
        validators=(
            MinLengthValidator(MIN_VENUE_NAME_LENGTH),
        ),
        null=False,
        blank=False
    )

    photo = models.ImageField(
        upload_to='events-photos/',
        null=False,
        blank=True,
        validators=(validate_file_less_than_7mb,),
    )

    venue_date = models.DateField(
        blank=True,
        null=False,
    )

    location = models.CharField(
        max_length=MAX_LOCATION_LENGTH,
        validators=(
            MinLengthValidator(MIN_LOCATION_LENGTH),
        ),
        null=True,
        blank=False
    )

    address = models.CharField(
        max_length=MAX_ADDRESS_LENGTH,
        blank=True,
        null=True,
    )

    slug = models.SlugField(
        unique=True,
        null=False,
        blank=True,
    )

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.slug:
            self.slug = slugify(f'{self.id}-{self.venue}-{self.venue_date}')
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.venue}"
