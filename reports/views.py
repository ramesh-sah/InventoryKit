from rest_framework.viewsets import ModelViewSet
from .serializers import ReportSerializer
from .models import Report
from .renderers import UserRenderer


class AdminReportViewSet(ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    # renderer_classes = [UserRenderer]


