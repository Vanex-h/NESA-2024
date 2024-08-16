import os
import cv2
import shutil
import time
import ctypes

# Folder containing clusters
clusters_folder = "dataset-clusters"

def get_screen_resolution():
    user32 = ctypes.windll.user32
    screensize = user32.GetSystemMetrics(0), user32.GetSystemMetrics(1)
    return screensize

def review_images_in_cluster(cluster_folder):
    # Get screen resolution
    screen_width, screen_height = get_screen_resolution()
    
    # Get list of image files in the cluster
    image_files = [os.path.join(cluster_folder, img) for img in os.listdir(cluster_folder) if img.endswith('.jpg')]
    
    for img_file in image_files:
        # Load the image
        img = cv2.imread(img_file)
        
        # Display the image in a larger window
        cv2.namedWindow('Image Review', cv2.WINDOW_NORMAL)  # Create a resizable window
          # Set the initial size (you can adjust dimensions as needed)
        
        # Calculate window position to center it
        window_x = max(0, int((screen_width - 800) / 2))
        window_y = max(0, int((screen_height - 600) / 2))
        
        cv2.moveWindow('Image Review', window_x, window_y)  # Move the window to the calculated position
        
        cv2.imshow('Image Review', img)
        
        # Wait for 2 seconds
        time.sleep(1)
        
        # Check for user input
        key = cv2.waitKey(1)
        
        # If 'q' is pressed, quit the review process
        if key == ord('q'):
            print("Exiting...")
            cv2.destroyAllWindows()
            return
        
        # If 'd' is pressed, delete the image
        elif key == ord('d'):
            print(f"Deleting {img_file}")
            os.remove(img_file)
        
        # If 'k' is pressed, keep the image and move to the next
        elif key == ord('k'):
            print(f"Keeping {img_file}")

    # Close the image window
    cv2.destroyAllWindows()

def main():
    # Get list of cluster folders
    cluster_folders = [os.path.join(clusters_folder, f) for f in os.listdir(clusters_folder) if os.path.isdir(os.path.join(clusters_folder, f))]
    
    # Ask user for cluster number
    cluster_num = int(input("Enter the cluster number you want to review images in: "))
    
    # Check if cluster number is valid
    if cluster_num < 1 or cluster_num > len(cluster_folders):
        print("Invalid cluster number")
        return
    
    # Get the selected cluster folder
    cluster_folder = cluster_folders[cluster_num - 1]
    
    print(f"Reviewing images in {cluster_folder}")
    review_images_in_cluster(cluster_folder)

if __name__ == "__main__":
    main()
