from django.urls import reverse
from wagtail.core import hooks
from wagtail.admin import widgets as wagtailadmin_widgets
from django.utils.translation import gettext as _
from .urls import urlpatterns


@hooks.register('register_page_listing_buttons')
def page_listing_buttons(page, page_perms, is_parent=False, next_url=None):
    yield wagtailadmin_widgets.PageListingButton(
        _('Edit with GrapesJS'),
        reverse('grapesjs_editor', args=(page.id,)),
        priority=10
    )


@hooks.register('register_admin_urls')
def urlconf_time():
    return urlpatterns
