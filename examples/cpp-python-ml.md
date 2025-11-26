# Real-World Example: C++ Performance + Python ML

## Scenario
Combining C++ high-performance image processing with Python machine learning.

## C++ Code (Performance-Critical)
```cpp
#include <vector>
#include <algorithm>

class ImageProcessor {
public:
    std::vector<int> processPixels(const std::vector<int>& pixels) {
        std::vector<int> result;
        for (int pixel : pixels) {
            result.push_back(pixel * 2); // Example processing
        }
        return result;
    }
    
    double calculateMean(const std::vector<int>& data) {
        double sum = 0;
        for (int val : data) sum += val;
        return sum / data.size();
    }
};
```

## Python Code (ML Model)
```python
import numpy as np

def predict_image_class(processed_pixels):
    # ML model inference
    features = np.array(processed_pixels)
    prediction = model.predict(features.reshape(1, -1))
    return prediction[0]

def train_model(training_data, labels):
    # Model training logic
    model.fit(training_data, labels)
    return model
```

## GhostPatch Output
- **Bridge Type**: Python C Extension (ctypes/pybind11)
- **Generated Files**:
  - `image_processor.cpp` (original)
  - `image_processor.so` (compiled library)
  - `cpp_bridge.py` (Python wrapper)
  - `pipeline.py` (integrated workflow)

## Business Value
- **Performance**: 10-100x faster image processing
- **Flexibility**: Easy ML model updates in Python
- **Best of Both**: Speed + Simplicity
