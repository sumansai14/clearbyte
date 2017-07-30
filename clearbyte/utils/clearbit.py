from __future__ import absolute_import

import clearbit
from django.conf import settings
from requests import HTTPError


class Company(object):

    def __init__(self, data):
        data = dict(data)
        # print data.get('geo', {})
        self.city = data.get('geo', {}).get('city', None)
        self.state_code = data.get('geo', {}).get('stateCode', None)
        self.country = data.get('geo', {}).get('country', None)
        self.twitter_handle = data.get('twitter', {}).get('handle', None)
        self.linkedin_handle = data.get('linkedin', {}).get('handle', None)
        self.angellist_handle = data.get('angellist', {}).get('handle', None)
        self.facebook_handle = data.get('facebook', {}).get('handle', None)
        self.employee_count = data.get('employees', 0)
        self.domain_name = data.get('domain')
        self.name = data.get('name')
        self.site_url = data.get('url')
        self.description = data.get('description')
        self.clearbit_id = data.get('id')
        self.image_url = data.get('logo')


class ClearbitWrapperAPI(object):

    def __init__(self):
        clearbit.key = settings.CLEARBIT_API_KEY

    def find_company(self, domain):
        try:
            clearbit_data = clearbit.Company.find(domain=domain)
        except HTTPError:
            raise Exception("Company Not Found")
        company = Company(clearbit_data)
        return company


clearbit_wrapper = ClearbitWrapperAPI()
