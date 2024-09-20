import { ConversationRequest, ChatMessageOpenAI } from "./models";


export async function callConversationApi(options: ConversationRequest, abortSignal: AbortSignal): Promise<Response> {
    const response = await fetch("/api/conversation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: options.messages,
            conversation_id: options.id
        }),
        signal: abortSignal
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData.error));
    }

    return response;
}

export async function getAssistantTypeApi() {
    try {
        const response = await fetch("/api/assistanttype", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const config = await response.json(); // Parse JSON response
      return config;
    } catch (error) {
      console.error('Failed to fetch configuration:', error);
      return null; // Return null or some default value in case of error
    }
  }

  export async function uploadDocument(formData: FormData)
  {
    try {
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const embeddings = await response.json(); // Parse JSON response
      return embeddings;
    } catch (error) {
      console.error('Failed to upload:', error);
      return null; // Return null or some default value in case of error
    }
  }

  export async function callConversationWithDocumentApi(options: ConversationRequest, abortSignal: AbortSignal): Promise<Response> {
    const formData = new FormData();

    var simplifiedMessages = options.messages.map((message) => {
        return {
            role: message.role,
            content: message.content,
            end_turn: message.end_turn
        }
    });
    // Append the conversation request data as a JSON string
    formData.append("conversationData", JSON.stringify({
        messages: simplifiedMessages,
        conversation_id: options.id
    }));

    // Loop through all messages and append non-null attachments to FormData
    options.messages.forEach(message => {
      if (message.attachment) {
          formData.append("file", message.attachment);
      }
    });

    const response = await fetch("/api/embed", {
        method: "POST",
        body: formData,
        signal: abortSignal
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData.error));
    }

    return response;
}
