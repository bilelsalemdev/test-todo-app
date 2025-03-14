import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { User, UserDocument } from "./entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Check if user exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new UnauthorizedException("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      name,
    });

    // Generate token
    const token = this.jwtService.sign({ userId: user._id, email: user.email });

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Generate token
    const token = this.jwtService.sign({ userId: user._id, email: user.email });

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
