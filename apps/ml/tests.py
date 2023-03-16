from django.test import TestCase

from apps.ml.roberta_qa.roberta_qa import RoBERTaQAClassifier
import inspect
from apps.ml.registry import MLRegistry

class MLTests(TestCase):
    def test_rf_algorithm(self):
        input_data = {
            "question": "What is the capital of China?",
            "context": "China is a country located in East Asia. Its capital is Beijing."
        }
        my_alg = RoBERTaQAClassifier()
        response = my_alg.compute_prediction(input_data)
        self.assertEqual('OK', response['status'])

    def test_registry(self):
        registry = MLRegistry()
        self.assertEqual(len(registry.endpoints), 0)
        endpoint_name = "roberta_qa"
        algorithm_object = RoBERTaQAClassifier()
        algorithm_name = "RoBERTaQA"
        algorithm_status = "production"
        algorithm_version = "0.0.1"
        algorithm_owner = "Piotr"
        algorithm_description = "RoBERTa pretrained on SQuAD and BioASQ"
        algorithm_code = inspect.getsource(RoBERTaQAClassifier)
        # add to registry
        registry.add_algorithm(endpoint_name, algorithm_object, algorithm_name,
                    algorithm_status, algorithm_version, algorithm_owner,
                    algorithm_description, algorithm_code)
        # there should be one endpoint available
        self.assertEqual(len(registry.endpoints), 1)

    