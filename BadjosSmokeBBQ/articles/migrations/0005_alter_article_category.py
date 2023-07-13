# Generated by Django 4.2.2 on 2023-07-13 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_delete_articlecomment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='category',
            field=models.CharField(choices=[('food', 'Food'), ('beverages', 'Beverages'), ('experiments', 'Experiments'), ('events', 'Events'), ('the_rest', 'The Rest')], max_length=11),
        ),
    ]
