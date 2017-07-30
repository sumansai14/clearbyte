from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=255)
    clearbit_id = models.CharField(max_length=255, unique=True)
    domain_name = models.CharField(max_length=255)
    description = models.TextField()
    site_url = models.CharField(max_length=255)
    linkedin_handle = models.CharField(max_length=255, null=True, blank=True)
    angellist_handle = models.CharField(max_length=255, null=True, blank=True)
    twitter_handle = models.CharField(max_length=255, null=True, blank=True)
    facebook_handle = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    state_code = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    employee_count = models.IntegerField(null=True, blank=True)
    image_url = models.CharField(max_length=255, null=True, blank=True)
