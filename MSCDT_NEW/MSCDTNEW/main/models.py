from django.db import models

# Create your models here.

class Congratulation(models.Model):
    title = models.CharField(max_length=200, verbose_name="Заголовок")
    poem_text = models.TextField(verbose_name="Текст стихотворения")
    employee_name = models.CharField(max_length=100, verbose_name="Имя сотрудника", default="")
    employee_position = models.CharField(max_length=120, verbose_name="Должность сотрудника", default="")
    employee_photo = models.ImageField(upload_to='congratulations/', verbose_name="Фото сотрудника", blank=True, null=True)
    is_active = models.BooleanField(default=True, verbose_name="Активно")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    
    class Meta:
        verbose_name = "Поздравление"
        verbose_name_plural = "Поздравления"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title


class Event(models.Model):
    title = models.CharField(max_length=200, verbose_name="Название события")
    organization = models.CharField(max_length=200, verbose_name="Организация")
    description = models.TextField(verbose_name="Описание события")
    logo = models.ImageField(upload_to='events/', verbose_name="Логотип организации", blank=True, null=True)
    button_text = models.CharField(max_length=50, verbose_name="Текст кнопки", default="Подробнее")
    button_link = models.URLField(verbose_name="Ссылка кнопки", blank=True, null=True)
    is_active = models.BooleanField(default=True, verbose_name="Активно")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    order = models.PositiveIntegerField(default=0, verbose_name="Порядок отображения")
    
    class Meta:
        verbose_name = "Событие"
        verbose_name_plural = "События"
        ordering = ['order', '-created_at']
    
    def __str__(self):
        return self.title


class News(models.Model):
    NEWS_CATEGORY_CHOICES = [
        ('college', 'Новости колледжа'),
        ('committee', 'Новости комитета'),
        ('ministry', 'Новости Министерства'),
    ]
    
    title = models.CharField(max_length=200, verbose_name="Заголовок")
    description = models.TextField(verbose_name="Описание")
    category = models.CharField(max_length=20, choices=NEWS_CATEGORY_CHOICES, default='college', verbose_name="Категория")
    image = models.ImageField(upload_to='news/', verbose_name="Изображение", blank=True, null=True)
    button_text = models.CharField(max_length=50, verbose_name="Текст кнопки", default="Подробнее")
    button_link = models.URLField(verbose_name="Ссылка кнопки", blank=True, null=True)
    is_active = models.BooleanField(default=True, verbose_name="Активно")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    order = models.PositiveIntegerField(default=0, verbose_name="Порядок отображения")
    
    class Meta:
        verbose_name = "Новость"
        verbose_name_plural = "Новости"
        ordering = ['order', '-created_at']
    
    def __str__(self):
        return self.title


