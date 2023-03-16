# file backend/server/apps/ml/income_classifier/random_forest.py
import torch
import torch.nn as nn
from transformers import (
    BertPreTrainedModel,
    RobertaModel,
    AutoConfig,
    AutoTokenizer,
)



class RobertaQA(BertPreTrainedModel):
    def __init__(self):
        config = AutoConfig.from_pretrained("roberta-base")
        super().__init__(config)
        self.roberta = RobertaModel(config=AutoConfig.from_pretrained("roberta-base"))
        self.qa_outputs = nn.Linear(768, 2)
    
    def forward(self, input_ids):

        outputs = self.roberta(
            input_ids,
        )
        
        sequence_output = outputs[0]

        logits = self.qa_outputs(sequence_output)
        start_logits, end_logits = logits.split(1, dim=-1)
        start_logits = start_logits.squeeze(-1)
        end_logits = end_logits.squeeze(-1)
        
        start_index = torch.argmax(start_logits)
        end_index = torch.argmax(end_logits)

        answer_tokens = input_ids[0, start_index:end_index+1]
        
        return answer_tokens

class RoBERTaQAClassifier:
    def __init__(self):
        #state_dict = torch.load("collectedstatic/model/roberta-base-qa.bin", map_location="cpu")
        self.tokenizer = AutoTokenizer.from_pretrained("DDCVLab/BioASQ-RoBERTa")
        self.model = RobertaQA.from_pretrained("DDCVLab/BioASQ-RoBERTa")
        #self.model = RobertaQA()
        #self.model.load_state_dict(state_dict)
    def preprocessing(self, input_data):
        # JSON to pandas DataFrame
        try:
            question = input_data["question"]
            context = input_data["context"]
        except:
            raise KeyError("Invalid input data")

        input_ids = self.tokenizer.encode(question, context)
        input_ids = torch.tensor([input_ids])

        return input_ids

    def predict(self, input_data):
        return self.model(input_data)

    def postprocessing(self, input_data):
        answer = self.tokenizer.decode(input_data)
        return {"input_ids": input_data, "answer": answer, "status": "OK"}

    def compute_prediction(self, input_data):

        try:
            input_data = self.preprocessing(input_data)
            prediction = self.predict(input_data)  # only one sample
            prediction = self.postprocessing(prediction)
        except Exception as e:
            return {"status": "Error", "message": str(e)}

        return prediction