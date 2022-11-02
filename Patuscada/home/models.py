from random import choices
from django.db import models
from django.forms import ChoiceField

# Create your models here.

APOIO_GRUPO = [
    ('STD', 'Standart'),
    ('MTR', 'Master'),
    ('PRM', 'Premium'),
    ('PLT', 'Platinum')
]

class OndeFicar(models.Model):
    descricao = models.CharField(max_length = 50)
    contato = models.CharField(max_length = 50)
    falarCom = models.CharField(max_length = 50)
    
    def __str__(self) :
        return self.descricao + " - " + self.falarCom
    
class Apoio(models.Model):
    nome = models.CharField(max_length = 50)
    telefone = models.CharField(max_length = 50, blank=True, null=True)
    falarCom = models.CharField(max_length = 50, blank=True, null=True)
    logomarca = models.ImageField()
    grupo = models.CharField(max_length = 3, choices=APOIO_GRUPO)
    
    def __str__(self):
        return self.nome
    