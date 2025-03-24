ssh-keygen -t rsa -b 4096 -C
"aryalshakshi1234@gmail.com"
Add SSH Key to SSH Agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
Add SSH Key to GitHub/GitLab
cat ~/.ssh/id_rsa.pub
Add to GitHub: Settings → SSH and GPG
keys
Test SSH Connection
ssh -T git@github.com
ssh -T git@gitlab.com
Clone Repository Using SSH
git clone git@github.com:anwrat/Git-collab-practice.git
Verify Remote URL
git remote -