import os


def main():
    result = []
    for id, filename in enumerate(os.listdir("public\\audio")):
        result.append(
            {
                "id": id,
                "title": filename[0:-4],
                "author": "neverlane",
                "cover": "/covers/track-by-neverlane.png",
                "decription": "wntn music <3",
                "song": f"/audio/{filename}"
            }
        )
    print(result)

if __name__ == "__main__":
    main()
