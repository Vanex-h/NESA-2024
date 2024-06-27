package rw.ac.rca.nesa_2024.dto.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor

public class ApiResponse {
    private Boolean success;
    private String message;
    private Object data;
    public ApiResponse(String message, Boolean success, Object data) {
        this.message = message;
        this.success = success;
        this.data = data;
    }
    public ApiResponse(Boolean success, String message){
        this.message = message;
        this.success = success;
    }
}
