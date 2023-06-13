from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path, include
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('BadjosSmokeBBQ.common.urls')),
    path('articles/', include('BadjosSmokeBBQ.articles.urls')),
    path('menu/', include('BadjosSmokeBBQ.menu.urls')),
    path('events/', include('BadjosSmokeBBQ.events.urls')),
    path('photos/', include('BadjosSmokeBBQ.photos.urls')),
    path('story/', include('BadjosSmokeBBQ.story.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
