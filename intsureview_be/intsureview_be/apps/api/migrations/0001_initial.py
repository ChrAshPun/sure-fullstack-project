# Generated by Django 4.1.9 on 2023-06-24 08:01

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Job",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("position", models.CharField(max_length=200)),
                ("company", models.CharField(max_length=200)),
                ("location", models.CharField(blank=True, max_length=200)),
                ("date_applied", models.DateField(blank=True, default="")),
                ("received_offer", models.BooleanField(default=False)),
                ("web_stack", models.CharField(blank=True, max_length=200)),
            ],
        ),
    ]
