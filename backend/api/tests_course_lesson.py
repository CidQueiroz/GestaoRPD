from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .models import Course, Lesson, Usuario
from .serializers import CourseSerializer, LessonSerializer

class CourseLessonAPITests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Usuario.objects.create_user(email='testuser@example.com', password='testpassword')
        self.client.force_authenticate(user=self.user)

        self.course_data = {
            'nome': 'Test Course',
            'descricao': 'This is a test course.',
            'quantidade_horas': 10,
            'lessons': [
                {
                    'data_aula': '2024-01-01T10:00:00Z',
                    'topicos_abordados': 'Topic 1, Topic 2',
                },
                {
                    'data_aula': '2024-01-02T10:00:00Z',
                    'topicos_abordados': 'Topic 3, Topic 4',
                }
            ]
        }
        self.course = Course.objects.create(usuario=self.user, nome='Another Course', quantidade_horas=5)


    def test_create_course_with_lessons(self):
        """
        Ensure we can create a new course with nested lessons.
        """
        url = reverse('course-list')
        response = self.client.post(url, self.course_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Course.objects.count(), 2)
        self.assertEqual(Lesson.objects.count(), 2)
        
        course = Course.objects.get(nome='Test Course')
        self.assertEqual(course.lessons.count(), 2)
        self.assertEqual(course.lessons.first().topicos_abordados, 'Topic 1, Topic 2')


    def test_update_course_with_lessons(self):
        """
        Ensure we can update a course and its lessons.
        """
        # First, create a course with lessons
        url_create = reverse('course-list')
        response_create = self.client.post(url_create, self.course_data, format='json')
        course_id = response_create.data['id']
        
        # Now, update the course
        lesson_to_update = response_create.data['lessons'][0]
        
        update_data = {
            'nome': 'Updated Test Course',
            'lessons': [
                {
                    'id': lesson_to_update['id'],
                    'topicos_abordados': 'Updated Topics',
                    'concluida': True
                }
            ]
        }
        
        url_update = reverse('course-detail', kwargs={'pk': course_id})
        response_update = self.client.patch(url_update, update_data, format='json')
        
        self.assertEqual(response_update.status_code, status.HTTP_200_OK)
        
        updated_course = Course.objects.get(id=course_id)
        self.assertEqual(updated_course.nome, 'Updated Test Course')
        self.assertEqual(updated_course.lessons.count(), 1) # One lesson was deleted
        
        updated_lesson = updated_course.lessons.first()
        self.assertEqual(updated_lesson.topicos_abordados, 'Updated Topics')
        self.assertTrue(updated_lesson.concluida)
