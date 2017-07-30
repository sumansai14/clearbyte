from django.conf.urls import include, url
from django.contrib import admin
from clearbyte.web.home import HomeView
from clearbyte.api.views.company import CompanyViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api/company', CompanyViewSet)

urlpatterns = [
    # Examples:
    # url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^company/search/.*/$', HomeView.as_view(), name='adamantium-home'),
    url(r'^$', HomeView.as_view(), name='adamantium-home'),
] + router.urls
