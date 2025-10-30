from django.contrib import admin
from .models import Congratulation, Event, News, Partner


@admin.register(Congratulation)
class CongratulationAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active", "created_at")
    list_filter = ("is_active",)
    search_fields = ("title", "employee_name", "employee_position")


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "organization", "is_active", "order")
    list_editable = ("order", "is_active")
    search_fields = ("title", "organization")


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "is_active", "order", "created_at")
    list_filter = ("category", "is_active")
    list_editable = ("order", "is_active")
    search_fields = ("title",)


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active", "order")
    list_editable = ("order", "is_active")
    search_fields = ("name",)


