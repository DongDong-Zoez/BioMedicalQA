# file backend/server/server/wsgi.py
import os
from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
application = get_wsgi_application()

# ML registry
import inspect
from apps.ml.registry import MLRegistry
from apps.ml.roberta_qa.roberta_qa import RoBERTaQAClassifier

try:
    registry = MLRegistry() # create ML registry
    # Random Forest classifier
    rf = RoBERTaQAClassifier()
    # add to ML registry
    registry.add_algorithm(endpoint_name="roberta_qa",
                            algorithm_object=rf,
                            algorithm_name="RoBERTaQA",
                            algorithm_status="production",
                            algorithm_version="0.0.1",
                            owner="DongDong",
                            algorithm_description="RoBERTa pretrained on SQuAD and BioASQ",
                            algorithm_code=inspect.getsource(RoBERTaQAClassifier))

except Exception as e:
    print("Exception while loading the algorithms to the registry,", str(e))