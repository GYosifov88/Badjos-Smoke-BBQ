from django import forms

from BadjosSmokeBBQ.articles.models import ArticleComment


class ArticleCommentForm(forms.ModelForm):
    class Meta:
        model = ArticleComment
        fields = ('text', 'commentor_name', 'commentor_email',)
        widgets = {
            'text': forms.Textarea(
                attrs={
                    'cols': 40,
                    'rows': 10,
                    'placeholder': 'type your message',
                }
            ),
            # 'commentor_name': forms.CharField(
            #
            #     attrs={
            #         'placeholder': 'enter your name',
            #     }
            # ),
            # 'commentor_email': forms.EmailField(
            #     attrs={
            #         'placeholder': 'enter your e-mail address',
            #     }
            # ),
        }