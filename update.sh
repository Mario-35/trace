 #/
 # Stean Bash.
 #
 # @copyright 2024-present Inrae
 # @author mario.adam@inrae.fr 
 # version 1.1
 #
 #/

clear
# Name of the file downladed
FILEDIST=./dist.zip
# Name of the backup
FILEDISTOLD=./distOld.zip 

# Function to make bak 
save_dist() {
    if [ -f "$FILEDIST" ]; then
        rm -f $FILEDISTOLD
        echo "Delete => $FILEDISTOLD"
        mv $FILEDIST $FILEDISTOLD
        echo "Move $FILEDIST => $FILEDISTOLD"
    fi
}

# Function to get trace
download_dist() {
    save_dist
    sudo curl -L -O https://github.com/Mario-35/trace/raw/refs/heads/main/dist.zip
}


# Function to install trace
install_trace() {
    unzip -qq -o $FILEDIST -d ./trace/
    save_dist
    npm install --omit=dev --prefix ./trace/
}

download_dist
install_trace