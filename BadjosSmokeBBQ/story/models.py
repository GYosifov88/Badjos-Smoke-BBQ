# from django.db import models
#
# from BadjosSmokeBBQ.core.model_mixins import StrFromFieldsMixin
# from BadjosSmokeBBQ.core.validators import validate_file_less_than_7mb
#
#
# class Story(StrFromFieldsMixin, models.Model):
#     str_fields = ('pk', 'photo', 'title')
#     MAX_AUTHOR_NAME = 40
#     MAX_LEN_TITLE = 100
#
#     title = models.CharField(
#         max_length=MAX_LEN_TITLE,
#         blank=False,
#         null=False
#     )
#
#     author = models.CharField(
#         max_length=MAX_AUTHOR_NAME,
#         blank=False,
#         null=False
#     )
#
#     photo = models.ImageField(
#         upload_to='story_photos/',
#         null=False,
#         blank=True,
#         validators=(validate_file_less_than_7mb,),
#     )
#
#     description = models.TextField()
#
#     publication_date = models.DateField(
#         auto_now=True,
#         blank=True,
#         null=False,
#     )
