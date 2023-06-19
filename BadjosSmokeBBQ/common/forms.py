from django import forms

from BadjosSmokeBBQ.common.models import Message


class ContactForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(ContactForm, self).__init__(*args, **kwargs)
        self.fields['sender_name'].widget.attrs.update({'class': 'form-control'})
        self.fields['message'].widget.attrs.update({'class': 'form-control'})
        self.fields['sender_email'].widget.attrs.update({'class': 'form-control'})
