import cv2
import numpy as np


def  check_hazard_proxy(frame):
    # 1. Define ROI: Let's choose a 100x100 box in the top-center of the frame
    h, w, _ = frame.shape

    # Calculate starting coordinates for the top-center ROI
    x_start = w // 2 - 50
    x_end = w // 2 + 50
    y_start = 0
    y_end = 100

    # Extract the ROI from the frame
    roi = frame[y_start:y_end, x_start:x_end]

    # OPTIONAL: Draw a box on the frame to visually show the user where the ROI is
    cv2.rectangle(frame, (x_start, y_start), (x_end, y_end), (255, 255, 255), 2)

    # 2. Analyze Color: Calculate the average BGR color of the ROI
    # OpenCV uses BGR format: Blue=0, Green=1, Red=2
    avg_color = np.mean(roi, axis=(0, 1))

    avg_red = avg_color[2]

    # 3. Set Rule: Set a high threshold for the red channel
    RED_THRESHOLD = 200  # Max value is 255

    if avg_red > RED_THRESHOLD:
        # HAZARD DETECTED!
        return True, f"DANGER: HEAT PROXY (R={int(avg_red)})"
    else:
        # Area is visually clear
        return False, f"Area Clear (R={int(avg_red)})"


# --- REMEMBER TO TEST YOUR FUNCTION IN THIS FILE BEFORE COMMITTING ---

# Test it by calling it directly (D1's job)
if __name__ == '__main__':
    # You would need to create a mock frame or use a webcam loop here
    # for full testing, but the D3's main.py will handle the final loop.
    print("Run successful! This file is ready for D3 to import.")