from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    Assumes the model instance has a 'usuario' attribute.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.usuario == request.user

class IsOwnerOfCourse(permissions.BasePermission):
    """
    Custom permission to only allow owners of a course to view/edit its lessons.
    Assumes the model instance has a 'course' attribute, which has a 'usuario'.
    """
    def has_object_permission(self, request, view, obj):
        # Check if the user is the owner of the course the lesson belongs to.
        return obj.course.usuario == request.user
