// This script parse all posts, get all "image" attribute, try to find the corresponding image, and fix the attribute if necessary.

import java.io.File


fun File.listFilesRecursively(): Collection<File> {
    val foundFiles = mutableSetOf<File>()
    for (file in this.listFiles()) {
        if (file.isDirectory) {
            foundFiles.addAll(file.listFilesRecursively())
        } else {
            foundFiles.add(file)
        }
    }
    return  foundFiles
}

// Create dictionnary of all available images
val allImages = File("../site/static").listFilesRecursively()

val posts = File("../site/content/posts").listFiles()
// Find posts which image is not set properly
for (post in posts) {
    println("\t> ${post.name}...")
    val postContent = post.readLines()
    val imageAttribute = postContent.find { it.startsWith("image:") }
    if (imageAttribute == null) {
        println("💥 No 'image' attribute found.")
        continue;
    }
    val imagePath = imageAttribute.split(":")[1];
    val image = File("../site/static" + imagePath.trim())
    if (image.exists()) {
        println("🎉 Image path already good!")
        continue
    }

    val matchingImage = allImages.find { it.name == image.name }
    if (matchingImage == null) {
        println("😡 No corresponding image found: ${image.name}")
        continue;
    }

    println(matchingImage.path)
    val newImagePath = matchingImage.path.replace("../site/static", "")
    val newContent = post.readText().replace(imageAttribute, "image: ${newImagePath}")
    post.writeText(newContent)
    println("👍 Corresponding image found and fixed!")
}
