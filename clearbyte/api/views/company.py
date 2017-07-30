from rest_framework import viewsets
from rest_framework.response import Response
from clearbyte.utils.clearbit import clearbit_wrapper
from clearbyte.api.serializers.company import CompanySerializer
from clearbyte.models import Company
from rest_framework.decorators import list_route
from rest_framework.exceptions import NotFound


class CompanyViewSet(viewsets.ModelViewSet):

    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def list(self, request):
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)

    @list_route()
    def search(self, request):
        domain_name = request.GET.get('domain')
        if Company.objects.filter(domain_name=domain_name).exists():
            company = Company.objects.get(domain_name=domain_name)
        else:
            try:
                company = clearbit_wrapper.find_company(domain_name)
            except Exception:
                raise NotFound(detail="Company not found")
        serializer = CompanySerializer(company)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
