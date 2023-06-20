from django import forms

from BadjosSmokeBBQ.common.models import Message, Newsletter


class ContactForm(forms.ModelForm):
    contact_forms = forms.BooleanField(widget=forms.HiddenInput, initial=True)
    class Meta:
        model = Message
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(ContactForm, self).__init__(*args, **kwargs)
        self.fields['sender_name'].widget.attrs.update({'class': 'form-control'})
        self.fields['message'].widget.attrs.update({'class': 'form-control'})
        self.fields['sender_email'].widget.attrs.update({'class': 'form-control'})


class NewsletterForm(forms.ModelForm):
    newsletter_forms = forms.BooleanField(widget=forms.HiddenInput, initial=True)
    class Meta:
        model = Newsletter
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(NewsletterForm, self).__init__(*args, **kwargs)
        self.fields['email'].widget.attrs.update({'class': 'form-control'})
