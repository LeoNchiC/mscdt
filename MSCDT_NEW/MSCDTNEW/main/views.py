from django.shortcuts import render
from django.http import HttpResponse
from .models import Congratulation, Event, News

# Create your views here.

def home(request):
    # Получаем активное поздравление
    congratulation = Congratulation.objects.filter(is_active=True).first()
    
    # Получаем активные события
    events = Event.objects.filter(is_active=True).order_by('order', '-created_at')
    
    # Получаем активные новости по категориям
    college_news = News.objects.filter(category='college', is_active=True).order_by('order', '-created_at')[:6]
    committee_news = News.objects.filter(category='committee', is_active=True).order_by('order', '-created_at')[:6]
    ministry_news = News.objects.filter(category='ministry', is_active=True).order_by('order', '-created_at')[:6]
    
    context = {
        'congratulation': congratulation,
        'events': events,
        'college_news': college_news,
        'committee_news': committee_news,
        'ministry_news': ministry_news,
    }
    return render(request, 'main/home.html', context)