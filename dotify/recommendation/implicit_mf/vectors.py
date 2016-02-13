import numpy as np
import pandas as pd


class UserVectors:
    
    def __init__(self, ratings_matrix, f):
        self.vectors = pd.DataFrame(
            np.random.randn(ratings_matrix.R_ui.shape[0], f),
            columns=range(f),
            index=ratings_matrix.R_ui.index
        )
        
class ItemVectors:
    
    def __init__(self, ratings_matrix, f):
        self.vectors = pd.DataFrame(
            np.random.randn(ratings_matrix.R_ui.shape[1], f),
            columns=range(f),
            index=ratings_matrix.R_ui.columns
        )
        