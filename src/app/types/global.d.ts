export {};

declare global {
    interface Notes {
        note_title: string
        note_description: string
        note_id: string
        timestamp: any
    }

    interface LoggedOut {
        success: false
    }
    
    interface LoggedIn {
        success: true
        email: string | null
        uid: string | number | null
    }
    
    interface AuthenticationError {
        success: false
        error: any
    }
}