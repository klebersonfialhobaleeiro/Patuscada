from django.conf import settings
from django.core import mail
from django.core.mail import send_mail
from django.core.mail.message import EmailMessage

from django.contrib import messages
from django.shortcuts import redirect, render
from django.urls import reverse

from .models import OndeFicar, Apoio

# Create your views here.

def home(request):
    if request.method == 'GET':
        onde = OndeFicar.objects.all()
        apoios = Apoio.objects.all()
        context ={
            'onde':onde,
            'apoios' : apoios
        }
        return render(request, 'home/index.html', context)
    
    elif request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        instagram = request.POST.get('instagram')
        message = request.POST.get('message')

        #eviar o email
        from_email = settings.EMAIL_HOST_USER
        connection = mail.get_connection()
        connection.open()

        #AQUI TEMOS O ENVIO DE DOIS EMAIL
        email_empresa = mail.EmailMessage(f'Novo contato de {name}', f'{name} com o email: {email}\n telefone: {phone}\n instagram: {instagram}\n tem a seguinte dúvida: {message}', from_email,
        ["COLOCAR O EMAIL DA PATUSCADA"], connection=connection)
        email_cliente = mail.EmailMessage(f'Obrigado {name}', f'Obrigado {name} por entrar em contato com a gente! Nós vamos responder para você o mais rápido possível.', from_email,
        [email], connection=connection)
        
        connection.send_messages([email_empresa, email_cliente])
        connection.close()

        messages.add_message(request, messages.SUCCESS, 'Mensagem enviada')
        return redirect(reverse('home'))