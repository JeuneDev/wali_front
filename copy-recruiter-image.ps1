# Script PowerShell pour copier l'image du recruteur
# Exécutez ce script après avoir téléchargé l'image du recruteur

# Chemin de destination
$destinationPath = "d:\wali\wali_front\wali\src\assets\recruiter_hero_image.png"

# Demander à l'utilisateur de sélectionner le fichier image
Write-Host "Veuillez sélectionner l'image du recruteur..." -ForegroundColor Cyan

Add-Type -AssemblyName System.Windows.Forms
$openFileDialog = New-Object System.Windows.Forms.OpenFileDialog
$openFileDialog.Filter = "Images PNG (*.png)|*.png|Toutes les images (*.jpg;*.jpeg;*.png)|*.jpg;*.jpeg;*.png"
$openFileDialog.Title = "Sélectionnez l'image du recruteur"

if ($openFileDialog.ShowDialog() -eq 'OK') {
    $sourcePath = $openFileDialog.FileName
    
    Write-Host "Copie de l'image..." -ForegroundColor Yellow
    Copy-Item -Path $sourcePath -Destination $destinationPath -Force
    
    if (Test-Path $destinationPath) {
        Write-Host "✓ Image copiée avec succès !" -ForegroundColor Green
        Write-Host "Chemin : $destinationPath" -ForegroundColor Green
        Write-Host "`nVous pouvez maintenant rafraîchir votre navigateur pour voir l'alternance des images." -ForegroundColor Cyan
    } else {
        Write-Host "✗ Erreur lors de la copie de l'image" -ForegroundColor Red
    }
} else {
    Write-Host "Opération annulée" -ForegroundColor Yellow
}

Read-Host "`nAppuyez sur Entrée pour fermer"
