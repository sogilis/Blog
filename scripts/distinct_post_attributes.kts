// This script parse all posts, get all attribute keys (between "---"), and print all distinct set of attributes

import java.io.File

val posts = File("site/content/posts").listFiles()
val headers = mutableMapOf<String, List<String>>()
for (post in posts) {
    println("# FILE $post.name...")
    var capture = false
    val header = mutableListOf<String>()
    for(line in post.readLines()){
        if (line.startsWith("---")){
            if (!capture) {
                capture = true;
            } else {
                println("Header captured")
                // TODO uniq
                println(header.joinToString("\n"))
                headers.put(post.name, header)
                break;
            }
        }
        if (capture && line.matches("""^\w+:""".toRegex())){
            header.add(line)
        }
    }
}

println("HEADERS FOUND:")
println(headers.values.distinct())
