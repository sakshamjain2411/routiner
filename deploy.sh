# Step 1: Build the project
echo "Building the project..."
ng build
if [ $? -ne 0 ]; then
    echo "Build failed, exiting script."
    exit 1
fi

# Step 2: Copy the files to the dist folder
echo "Copying files to dist folder..."
rm -rf ../dist/*
mv dist/browser/* ../dist

# Step 3: Change directory to dist
echo "Changing directory to dist..."
cd ../dist

# Step 4: Add files
git add .

# Step 5: Commit changes
echo "Committing changes..."
CURRENT_TIME=$(date "+%Y-%m-%d %H:%M:%S")
git commit -m "Deploy: $CURRENT_TIME"

# Step 6: Push changes to master branch
echo "Pushing changes to master branch..."
git push -u origin main