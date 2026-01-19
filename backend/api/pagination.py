from rest_framework.pagination import PageNumberPagination

class CustomPageNumberPagination(PageNumberPagination):
    page_size = 10 # Número de itens por página
    page_size_query_param = 'page_size' # Permite que o cliente defina o tamanho da página
    max_page_size = 100 # Tamanho máximo da página para evitar abuso
