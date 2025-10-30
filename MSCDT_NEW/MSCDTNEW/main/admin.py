from django.contrib import admin
from .models import Congratulation, Event, News

# Admin branding
admin.site.site_header = "MSCDT Control Panel"
admin.site.site_title = "MSCDT Admin"
admin.site.index_title = "Управление сайтом"

@admin.register(Congratulation)
class CongratulationAdmin(admin.ModelAdmin):
    list_display = ['title', 'employee_name', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'employee_name']
    list_editable = ['is_active']
    readonly_fields = ['created_at']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'is_active')
        }),
        ('Содержание', {
            'fields': ('poem_text',)
        }),
        ('Информация о сотруднике', {
            'fields': ('employee_name', 'employee_position', 'employee_photo')
        }),
        ('Системная информация', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'organization', 'is_active', 'order', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'organization', 'description']
    list_editable = ['is_active', 'order']
    readonly_fields = ['created_at']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'organization', 'description', 'is_active', 'order')
        }),
        ('Визуальные элементы', {
            'fields': ('logo',)
        }),
        ('Кнопка действия', {
            'fields': ('button_text', 'button_link')
        }),
        ('Системная информация', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_active', 'order', 'created_at']
    list_filter = ['category', 'is_active', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['is_active', 'order']
    readonly_fields = ['created_at']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'description', 'category', 'is_active', 'order')
        }),
        ('Визуальные элементы', {
            'fields': ('image',)
        }),
        ('Кнопка действия', {
            'fields': ('button_text', 'button_link')
        }),
        ('Системная информация', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )



